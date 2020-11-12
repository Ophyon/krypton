import React from "react";
import MonacoEditor from "react-monaco-editor";
import { saveSync } from "save-file";
//import { WhistleLanguageDef, WhistleConfiguration } from "./WhistleConfig.js"
import { LanguageData } from "./data"
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: LanguageData[0].code,
            theme: "vs-dark",
            language: 0
        };
    }
    editorWillMount = (monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    uri: "http://myserver/foo-schema.json",
                    schema: {
                        type: "object",
                        properties: {
                            p1: {
                                enum: ["v1", "v2"],
                            },
                            p2: {
                                $ref: "http://myserver/bar-schema.json",
                            },
                        },
                    },
                },
                {
                    uri: "http://myserver/bar-schema.json",
                    schema: {
                        type: "object",
                        properties: {
                            q1: {
                                enum: ["x1", "x2"],
                            },
                        },
                    },
                },
            ],
        });
    };
    editorDidMount = (editor, monaco) => {
        const params = new URLSearchParams(window.location.search)
        if (params.has('code')) {
            this.setState({ code: atob(params.get('code')) })
        }
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
        if (this.state.language === LanguageData.length - 1) {
            this.setState({
                language: 0,
                code: LanguageData[0].code
            });
        } else {
            this.setState({
                language: this.state.language + 1,
                code: LanguageData[this.state.language + 1].code
            });
        }
    }
    saveFile = () => {

        saveSync(this.state.code, "example.txt");
    };
    setGitUrl = () => {
        let urlPrompt = prompt("url: ", "ophyon/oxyde/master/src/App.js")
        fetch("https://raw.githubusercontent.com/" + urlPrompt)
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
                        {LanguageData[language].icon}
                    </span>
                    <span className=" topElement hiddenlang">{LanguageData[language].name}</span>
                    <span className="topElement" onClick={this.setGitUrl}>
                        🐈
                    </span>
                    <span className="topElement" onClick={this.saveFile}>
                        💾
                    </span>
                </div>
                <MonacoEditor
                    height="800"
                    language={LanguageData[language].name}
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                    editorWillMount={this.editorWillMount}
                    theme={theme}
                />
            </div>
        );
    }
}

export default App;
