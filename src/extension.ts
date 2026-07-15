import * as vscode from 'vscode'
import { Uri, ExtensionContext, workspace as Workspace } from 'vscode'

const CONFIG_FILE_GLOB = 'courier.json'

interface CourierConfig {
  handle?: string
  site?: string
  cassette?: string
  // Not part of the official courier.json schema (the Courier CLI stores your
  // access token in the OS keychain), but you can add it to your local,
  // gitignored courier.json to enable collection/form autocomplete here.
  token?: string
}

interface CollectionField {
  name: string
}

interface CollectionSummary {
  id: string
  handle: string
}

interface CollectionDetail {
  handle: string
  fields: CollectionField[]
}

interface FormField {
  name: string
}

interface FormSummary {
  handle: string
  template: string
  fields?: FormField[]
}

export async function activate(context: ExtensionContext) {
  const watcher = Workspace.createFileSystemWatcher(
    `**/${CONFIG_FILE_GLOB}`,
    false,
    false,
    true
  )

  watcher.onDidChange(() => refreshProjectData())
  watcher.onDidCreate(() => refreshProjectData())

  let collectionHandle: string[] = []
  let collectionVarF: string[] = []

  let formHandle: string[] = []
  let formVarf: string[] = []

  const auto = vscode.languages.registerCompletionItemProvider('html', {
    provideCompletionItems() {
      const cmsCol = new vscode.CompletionItem('cms.collection()')
      cmsCol.insertText = new vscode.SnippetString(
        "cms.collection('${1|" + (collectionHandle.join() || ' ') + "|}')"
      )
      cmsCol.documentation = new vscode.MarkdownString('Handle')

      const cmsForm = new vscode.CompletionItem('cms.form()')
      cmsForm.insertText = new vscode.SnippetString(
        "cms.form('${1|" + (formHandle.join() || ' ') + "|}')"
      )
      cmsForm.documentation = new vscode.MarkdownString('Handle')

      const entry = new vscode.CompletionItem('entry')
      entry.commitCharacters = ['.']
      entry.documentation = new vscode.MarkdownString(
        'Press `.` to get `entry.`'
      )

      const item = new vscode.CompletionItem('item')
      item.commitCharacters = ['.']
      item.documentation = new vscode.MarkdownString('Press `.` to get `item.`')

      const form = new vscode.CompletionItem('form')
      form.commitCharacters = ['.']
      form.documentation = new vscode.MarkdownString('Press `.` to get `form.`')

      return [cmsCol, cmsForm, entry, item, form]
    },
  })

  const fieldCompletionProvider = (suffix: string) => ({
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character)
      if (!linePrefix.endsWith(suffix)) {
        return undefined
      }

      return collectionVarF.map(
        (field) =>
          new vscode.CompletionItem(field, vscode.CompletionItemKind.Method)
      )
    },
  })

  const collectionAuto = vscode.languages.registerCompletionItemProvider(
    'html',
    fieldCompletionProvider('entry.'),
    '.'
  )

  const collectionAutoI = vscode.languages.registerCompletionItemProvider(
    'html',
    fieldCompletionProvider('item.'),
    '.'
  )

  const formAuto = vscode.languages.registerCompletionItemProvider(
    'html',
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character)
        if (!linePrefix.endsWith('form.')) {
          return undefined
        }

        return formVarf.map(
          (field) =>
            new vscode.CompletionItem(field, vscode.CompletionItemKind.Method)
        )
      },
    },
    '.' // triggered whenever a '.' is being typed
  )

  // Fetches collection and form handles/fields for the active workspace from
  // the Blutui Admin API (https://dev.blutui.com/docs), so `entry.`, `item.`
  // and `form.` can be autocompleted against the real fields of the project.
  const refreshProjectData = async () => {
    if (!vscode.workspace.workspaceFolders) {
      return
    }

    const wf = vscode.workspace.workspaceFolders[0].uri.fsPath
    const uri = Uri.file(wf + '/' + CONFIG_FILE_GLOB)

    let project: CourierConfig
    try {
      const document = await vscode.workspace.openTextDocument(uri)
      project = JSON.parse(document.getText())
    } catch {
      // No courier.json in this workspace (yet).
      return
    }

    if (!project.handle || !project.token) {
      // Autocomplete for entry./item./form. requires an access token to
      // query the Admin API. The Courier CLI keeps your token in the OS
      // keychain rather than courier.json, so add a `token` field to your
      // local (gitignored) courier.json to enable this feature.
      return
    }

    const site = project.site || `${project.handle}.blutui.com`
    const baseUrl = `https://${site}/admin/api`
    const headers = {
      Authorization: `Bearer ${project.token}`,
    }

    try {
      const collectionsResponse = await fetch(`${baseUrl}/collections`, {
        method: 'GET',
        headers,
      })
      const collectionsJson = (await collectionsResponse.json()) as {
        data?: CollectionSummary[]
      }
      const collections = collectionsJson.data ?? []

      collectionHandle = collections.map((c) => c.handle)

      const collect: CollectionDetail[] = []
      for (const summary of collections) {
        const detailResponse = await fetch(
          `${baseUrl}/collections/${summary.id}`,
          { method: 'GET', headers }
        )
        const detail = (await detailResponse.json()) as CollectionDetail
        collect.push({
          handle: detail.handle,
          fields: detail.fields ?? [],
        })
      }

      const collectionFields: string[] = []
      collect.forEach((collection) => {
        collection.fields.forEach((field) => {
          if (collectionFields.indexOf(field.name) === -1) {
            collectionFields.push(field.name)
          }
        })
      })
      collectionVarF = collectionFields

      const formsResponse = await fetch(`${baseUrl}/forms?expand[]=fields`, {
        method: 'GET',
        headers,
      })
      const formsJson = (await formsResponse.json()) as {
        data?: FormSummary[]
      }
      const forms = formsJson.data ?? []

      formHandle = forms.map((f) => f.handle)

      const formFields: string[] = []
      forms.forEach((f) => {
        ;(f.fields ?? []).forEach((field) => {
          if (formFields.indexOf(field.name) === -1) {
            formFields.push(field.name)
          }
        })
      })
      formVarf = formFields
    } catch (error) {
      console.error('Blutui IntelliSense: failed to load project data', error)
    }
  }

  const test = vscode.commands.registerCommand('extension.test', () => {
    vscode.window.showInformationMessage('I do work')
  })

  refreshProjectData()
  context.subscriptions.push(
    watcher,
    auto,
    collectionAuto,
    collectionAutoI,
    formAuto,
    test
  )
}

// this method is called when your extension is deactivated
export function deactivate() {}
