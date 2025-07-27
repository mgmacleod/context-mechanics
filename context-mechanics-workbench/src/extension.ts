import * as vscode from 'vscode';
import { SessionPanel } from './views/sessionPanel';
import { NotePanel } from './views/notePanel';
import { LLMProviderManager } from './llm/provider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Context Mechanics Workbench extension activated');

    const providerManager = new LLMProviderManager();
    const sessionPanel = new SessionPanel(context, providerManager);
    const notePanel = new NotePanel(context);

    const openWorkbenchCommand = vscode.commands.registerCommand('contextMechanics.openWorkbench', () => {
        vscode.window.showInformationMessage('Context Mechanics Workbench opened!');
        sessionPanel.show();
    });

    const newSessionCommand = vscode.commands.registerCommand('contextMechanics.newSession', () => {
        sessionPanel.createNewSession();
    });

    const sendMessageCommand = vscode.commands.registerCommand('contextMechanics.sendMessage', () => {
        sessionPanel.openMessageComposer();
    });

    context.subscriptions.push(
        openWorkbenchCommand,
        newSessionCommand,
        sendMessageCommand,
        sessionPanel,
        notePanel
    );
}

export function deactivate() {}