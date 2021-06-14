// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import fetch from 'node-fetch';
import * as vscode from 'vscode';
import {Uri} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "blutui-intellisense" is now active!');
	

	let collectionHandle : string[];
	let collectionID : string[];
	let collectionVar : string[];
	let collectionVarF : string[];

	let formHandle : string[];

	let formVarf : string[];

	let collectionObjects : object[];
	let FormObjects : object[];

	const auto = vscode.languages.registerCompletionItemProvider('html', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			disposable()

			const cmsCol = new vscode.CompletionItem('cms.collection()');
			cmsCol.insertText = new vscode.SnippetString("cms.collection('${1|"+collectionHandle.join()+"|}')");
			cmsCol.documentation = new vscode.MarkdownString("Handle");

			const cmsForm = new vscode.CompletionItem('cms.form()');
			cmsForm.insertText = new vscode.SnippetString("cms.form('${1|"+formHandle.join()+"|}')");
			cmsForm.documentation = new vscode.MarkdownString("Handle");

	
			const entry = new vscode.CompletionItem('entry');
			entry.commitCharacters = ['.'];
			entry.documentation = new vscode.MarkdownString('Press `.` to get `entry.`');

			const item = new vscode.CompletionItem('item');
			item.commitCharacters = ['.'];
			item.documentation = new vscode.MarkdownString('Press `.` to get `item.`');


			const form = new vscode.CompletionItem('form');
			form.commitCharacters = ['.'];
			form.documentation = new vscode.MarkdownString('Press `.` to get `form.`');

			return [
				cmsCol,
				cmsForm,
				entry,
				item,
				form
			];
		}
	});

	const collectionAuto = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('entry.')) {
					return undefined;
				}
				const colComplete: vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> = []
				
				var i = 0
				collectionVarF.forEach(element => {
					colComplete[i] = new vscode.CompletionItem(element, vscode.CompletionItemKind.Method)
					i++;
				})
				return colComplete;
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	const collectionAutoI = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('item.')) {
					return undefined;
				}
				const colComplete: vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> = []
				
				var i = 0
				collectionVarF.forEach(element => {
					colComplete[i] = new vscode.CompletionItem(element, vscode.CompletionItemKind.Method)
					i++;
				})
				return colComplete;
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	const formAuto = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('form.')) {
					return undefined;
				}
				const colComplete: vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> = []
				
				var i = 0
				formVarf.forEach(element => {
					colComplete[i] = new vscode.CompletionItem(element, vscode.CompletionItemKind.Method)
					i++;
				})
				

				return colComplete;

				
			}
		},
		'.' // triggered whenever a '.' is being typed
	);



	const disposable = async () => {
		console.log("Calling Api")

		if(vscode.workspace.workspaceFolders !== undefined) {
			let wf = vscode.workspace.workspaceFolders[0].uri.path ;
			let uri = Uri.file(wf+'/courier.json')
			vscode.workspace.openTextDocument(uri).then(async (document) => {
				let text = document.getText();
				let website = JSON.parse(text)

				let url = "https://" + website.site + "/api"

				let urlL = url + "/collections"
				const response = await fetch(urlL,{
					method: 'GET',
					headers: {
						Authorization: website.token
					}
				});
				const myJson = await response.json(); //extract JSON from the http response
				// do something with myJson
				collectionHandle = myJson.map((a:any) => a.handle);
				collectionID = myJson.map((a:any) => a.id);

				const collect = []
				const collectOp: string[] = [];

				for (const i of collectionID) {
					let urlID = urlL + "/" + i;
					const r = await fetch(urlID,{
						method: 'GET',
						headers: {
							Authorization: website.token
						}
					});
					const col = await r.json(); 
					collectionVar = await col.fields.map((a:any) => a.name);
					let collection = { 
						handle : col.handle,
						fields : collectionVar
					}
					collect.push(collection)
				}
				collectionObjects = collect;
				
				
				collect.forEach(element => {
					element.fields.forEach(el => {
						if( collectOp.indexOf(el) == -1 ){
							collectOp.push(el)
						}
					})
				});

				collectionVarF = collectOp;


				
				let urlF = url + "/forms"
				const g = await fetch(urlF,{
					method: 'GET',
					headers: {
						Authorization: website.token
					}
				});
				const j = await g.json();
				
				let form = j.map((a:any) => a.handle);
				let formL = j.map((a:any) => a.template);
				let formB = j.map((a:any) => a.fields.map((b:any) => b.name));

				const f = [];
				for (let index = 0; index < form.length; index++) 
				{
					let formobj = {
						handle : form[index],
						location : formL[index],
						fields : formB[index]
					}
					f.push(formobj)
				}
				FormObjects = f
				const formOp : string[] = [];

				formHandle = FormObjects.map((a:any) => a.handle);

				f.forEach(element => {
					element.fields.forEach((el: string) => {
						if( formOp.indexOf(el) == -1 ){
							formOp.push(el)
						}
					})
				});
				formVarf = formOp;

				console.log("Got Api") 
			});
		}
		
	};	

	disposable()
	context.subscriptions.push(auto,collectionAuto,collectionAutoI,formAuto);
}

// this method is called when your extension is deactivated
export function deactivate() {}
