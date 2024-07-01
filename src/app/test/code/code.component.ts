import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import { CodeServiceService } from "src/app/service/code-service/code-service.service";

@Component({
  selector: "app-code",
  templateUrl: "./code.component.html",
  styleUrls: ["./code.component.scss"],
})
export class CodeComponent implements OnInit, AfterViewInit {
  @ViewChild("editor") private editorRef!: ElementRef;
  response: any;

  constructor(private codeService: CodeServiceService) {}

  ngAfterViewInit(): void {
    const editor = ace.edit(this.editorRef.nativeElement);
    this.configureAce(editor);
  }

  ngOnInit() {}

  private configureAce(editor: any): void {
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBeautify: true,
    });
  }

  runCode() {
    const editor = ace.edit(this.editorRef.nativeElement);
    const code = editor.getValue();

    this.codeService
      .runScript("	python3", "3", code, null)
      .subscribe((response) => {
        this.response = response;
      });
  }
}
