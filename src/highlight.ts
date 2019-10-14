import * as vscode from 'vscode';
import { findFromRGBO } from './color-finder';

export function doHighlight(decorations: Map<string, vscode.TextEditorDecorationType>) {
    let activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    // clear all previous decorations
    decorations.forEach((v) => {
        v.dispose();
    });
    decorations.clear();

    const txt = activeEditor.document.getText();

    // find colors
    findFromRGBO(txt).then(
        results => {
            results.forEach((result) => {
                if (!activeEditor) {
                    return;
                }
                const decorationRange = {
                    range: new vscode.Range(
                        activeEditor.document.positionAt(result.start),
                        activeEditor.document.positionAt(result.end))
                };

                let key: string = result.start.toString() + '-' + result.end.toString();
                let decoType = vscode.window.createTextEditorDecorationType({
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgb(' + result.color + ')',
                });
                decorations.set(key, decoType);
                activeEditor.setDecorations(decoType, [decorationRange]);
            });
        }
    );
}