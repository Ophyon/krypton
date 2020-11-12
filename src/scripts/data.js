export const LanguageData = [
    {
        name: "javascript",
        icon: "📜",
        extension: "js",
        code: `
function printf(text) {
    console.log(text)
} `
    },
    {
        name: "python",
        icon: "🐍",
        extension: "py",
        code: `
def printf(text):
    print(text)
        `
    },
    {
        name: "rust",
        icon: "☢️",
        extension: "rs",
        code: `
fn main() {
    println!("Hello World!");
}
        `
    },
    {
        name: "typescript",
        icon: "📜",
        extension: "ts",
        code: `
function printf(text:string) {
    console.log(text)
}
        `
    },
    {
        name: "whistle",
        icon: "📜",
        extension: "whi",
        code: `
fun printf(text: string): none {
  #(js) console.log(text);
}

printf("Hello, World!")
        `
    },
    {
        name: "java",
        icon: "☕",
        extension: "java",
        code: `
public class Main {

  public static void main(String[] args) {
  	System.out.println("Hello, World!"); 
  }
  
}
        `
    },
    {
        name: "php",
        icon: "🚽",
        extension: "php",
        code: `
echo "Hello, World!";
        `
    }

]