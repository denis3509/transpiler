const callReplacer = require("./nodeReplacers/call");
const assignReplacer = require("./nodeReplacers/assign");
const phpPlugin = require("./index");
const File = require("../../File").createFile(phpPlugin);
const Transpiler = require("../../Transpiler").createTranspiler(phpPlugin);

const tr = new Transpiler();
const indent = "";
describe("php5to7", () => {
  test("should return list() with comment", () => {
    const code = "list()";
    const phpCode = "<?php " + code + ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr),indent,self))
      .toBe("list() /*Warning! List must not be empty*/")
  });
  test("should return list(,,) with comment", () => {
    const code = "list()";
    const phpCode = "<?php " + code + ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr),indent,self))
      .toBe("list(,,) /*Warning! List must not be empty*/")
  });
});