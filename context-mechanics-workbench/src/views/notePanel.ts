import * as vscode from 'vscode';

export class NotePanel implements vscode.TreeDataProvider<NoteItem>, vscode.Disposable {
    private _onDidChangeTreeData: vscode.EventEmitter<NoteItem | undefined | null | void> = new vscode.EventEmitter<NoteItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<NoteItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private notes: NoteItem[] = [];
    private treeView: vscode.TreeView<NoteItem>;

    constructor(private context: vscode.ExtensionContext) {
        this.treeView = vscode.window.createTreeView('contextMechanics.notePanel', {
            treeDataProvider: this,
            canSelectMany: false
        });

        this.registerCommands();
    }

    private registerCommands() {
        const addNoteCommand = vscode.commands.registerCommand('contextMechanics.addNote', () => {
            this.addNote();
        });

        const deleteNoteCommand = vscode.commands.registerCommand('contextMechanics.deleteNote', (note: NoteItem) => {
            this.deleteNote(note);
        });

        this.context.subscriptions.push(addNoteCommand, deleteNoteCommand);
    }

    getTreeItem(element: NoteItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: NoteItem): Thenable<NoteItem[]> {
        if (!element) {
            return Promise.resolve(this.notes);
        }
        return Promise.resolve([]);
    }

    async addNote() {
        const content = await vscode.window.showInputBox({
            prompt: 'Enter note content',
            placeHolder: 'Research observation...'
        });

        if (content) {
            const note = new NoteItem(
                content,
                new Date(),
                vscode.TreeItemCollapsibleState.None
            );
            
            this.notes.push(note);
            this._onDidChangeTreeData.fire();
        }
    }

    deleteNote(note: NoteItem) {
        const index = this.notes.indexOf(note);
        if (index > -1) {
            this.notes.splice(index, 1);
            this._onDidChangeTreeData.fire();
        }
    }

    exportNotes(): string {
        return this.notes.map(note => 
            `## ${note.timestamp.toLocaleString()}\n${note.content}\n`
        ).join('\n');
    }

    dispose() {
        this.treeView.dispose();
    }
}

class NoteItem extends vscode.TreeItem {
    constructor(
        public readonly content: string,
        public readonly timestamp: Date,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(content, collapsibleState);
        
        this.tooltip = `${this.content}\n${this.timestamp.toLocaleString()}`;
        this.description = this.timestamp.toLocaleTimeString();
        this.contextValue = 'note';
    }
}