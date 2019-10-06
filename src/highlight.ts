import * as vscode from 'vscode';
import { findFromRGBO } from './color-finder';

export function doHighlight() {
    let activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    const txt = activeEditor.document.getText();
    findFromRGBO(txt).then(
        results => {
            results.forEach((result) => {
                if (!activeEditor) {
                    return;
                }
                const decoration = {
                    range: new vscode.Range(
                        activeEditor.document.positionAt(result.start),
                        activeEditor.document.positionAt(result.end))
                };

                const colorDecorationType = vscode.window.createTextEditorDecorationType({
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgb(' + result.color + ')',
                });
                activeEditor.setDecorations(colorDecorationType, [decoration]);
            })
        }
    );
}