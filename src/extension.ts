import * as vscode from 'vscode';
import { doHighlight } from './highlight';

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	let decorations = new Map<string, vscode.TextEditorDecorationType>();

	vscode.workspace.onWillSaveTextDocument(() => { doHighlight(decorations); }, null, context.subscriptions);
}
