import { Component, ViewChild } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('editor') editor;

  title = 'antlr4';
  
  get theEditor(): any {
      return this.editor.getEditor()
  }
  
  ngAfterViewInit() {
  }
  
  setEditorMode() {
    var oop = ace.acequire('ace/lib/oop');
    var TextMode = ace.acequire("ace/mode/text").Mode;
    var TextHighlightRules = ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules;
    
     var MyHighlightRules = function() {
        var keywordMapper = this.createKeywordMapper({
            "keyword.control": "if|then|else",
            "keyword.operator": "and|or|not",
            "keyword.other": "class",
            "storage.type": "int|float|text",
            "storage.modifier": "private|public",
            "support.function": "print|sort",
            "constant.language": "true|false"
  }, "identifier");
        this.$rules = {
            "start": [
                { token : "comment", regex : "//" },
                { token : "string",  regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]' },
                { token : "constant.numeric", regex : "0[xX][0-9a-fA-F]+\\b" },
                { token : "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b" },
                { token : "keyword.operator", regex : "!|%|\\\\|/|\\*|\\-|\\+|~=|==|<>|!=|<=|>=|=|<|>|&&|\\|\\|" },
                { token : "punctuation.operator", regex : "\\?|\\:|\\,|\\;|\\." },
                { token : "paren.lparen", regex : "[[({]" },
                { token : "paren.rparen", regex : "[\\])}]" },
                { token : "text", regex : "\\s+" },
                { token: keywordMapper, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" }
            ]
        };
    };
    oop.inherits(MyHighlightRules, TextHighlightRules);

    var MyMode = function() {
        this.HighlightRules = MyHighlightRules;
    };
    oop.inherits(MyMode, TextMode);

    (function() {

        this.$id = "ace/mode/my-mode";

    }).call(MyMode.prototype);

    this.theEditor.session.setMode("ace/mode/my-mode");
  } 

}
