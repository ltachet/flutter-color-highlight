import * as vscode from 'vscode';
import { doHighlight } from './highlight';

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	vscode.window.onDidChangeActiveTextEditor(doHighlight, null, context.subscriptions);
	vscode.workspace.onDidChangeTextDocument(doHighlight, null, context.subscriptions);
	doHighlight();

}
