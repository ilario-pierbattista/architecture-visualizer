import * as ts from "typescript";

function getProjectAST(rootFiles: string[], options: ts.CompilerOptions) {
  // Create a program object
  const program = ts.createProgram(rootFiles, options);

  // Get all source files
  const sourceFiles = program.getSourceFiles();
  console.log("Source files: ", sourceFiles.map(sf => sf.fileName))

  // Process each source file
  sourceFiles.forEach(sourceFile => {
    if (!sourceFile.isDeclarationFile) {
      // Get the AST for this file
      const ast = sourceFile;
      
      // Now you can traverse or analyze the AST
      ts.forEachChild(ast, node => {
        // Process each node in the AST
        console.log(ts.SyntaxKind[node.kind]);
      });
    }
  });
}

// Usage
// const rootFiles = ["./src/ast.ts"]; // Entry point of your project
const rootFiles = [...process.env.FILES!.split(",")]
const options = {}; // Compiler options
getProjectAST(rootFiles, options);
