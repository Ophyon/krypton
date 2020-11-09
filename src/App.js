import React from "react";
import MonacoEditor from "react-monaco-editor";
import { saveSync } from "save-file";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `
      function test() {
          console.log("hi")
      }
      `,
      theme: "vs-dark",
      language: "javascript"
    };
  }
  editorDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };
  onChange = (newValue, e) => {
    console.log("onChange", newValue, e);
  };
  setTheme = () => {
    this.setState({
      theme: this.state.theme === "vs-light" ? "vs-dark" : "vs-light"
    });
  };
  setLanguage = () => {
    this.setState({
      language: this.state.language === "javascript" ? "python" : "javascript"
    });
    this.setState({
      code:
        this.state.language === "python"
          ? `
function test() {
  console.log("hi")
}
               `
          : `
def printf(text):
  print(text)
printf("hello world")
            `
    });
  };
  saveFile = () => {
    
    saveSync(this.state.code, "example.txt");
  };
  setGitUrl = () => {
    let urlPrompt = prompt("url: ","ophyon/oxyde/master/src/App.js")
    fetch("https://raw.githubusercontent.com/"+urlPrompt)
      .then((response) => response.text())
      .then((data) => this.setState({ code: data }));
  }

  render() {
    const { code, theme, language } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: true,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: true,
      cursorBlinking: "blink"
    };
    return (
      <div className={theme === "vs-light" ? "light" : "dark"}>
        <div id="buttons">
          <span className="topElement" onClick={this.setTheme}>
            {theme === "vs-light" ? "🌞" : "🌛"}
          </span>
          <span className="topElement" onClick={this.setLanguage}>
            {language === "javascript" ? "📜" : "🐍"}
          </span>
          <span className="topElement" onClick={this.setGitUrl}>
          🐈
          </span>
          <span className="topElement" onClick={this.saveFile}>
            💾
          </span>
        </div>
        <MonacoEditor
          height="800"
          language={language}
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          theme={theme}
        />
      </div>
    );
  }
}

export default App;
