module.exports = {
	rules: {
		'correct-import': {
			create: function (context) {
				return {
					ImportDeclaration(node) {
						const importPath = node.source.value;
						const isSvg = importPath.includes(".svg");
						const isDefaultImport = node.specifiers[0] && node.specifiers[0].type == "ImportDefaultSpecifier";
						if (isSvg && isDefaultImport) {
							const importName = node.specifiers[0].local.name;
							const startsWithUpper = (str) => {
								return str[0].toUpperCase() === str[0];
							};
							const upperFirstLetter = (str) => {
								return str[0].toUpperCase() + str.slice(1);
							};
							const lowerFirstLetter = (str) => {
								return str[0].toLowerCase() + str.slice(1);
							};
							if (importPath.endsWith(".svg") && importName && typeof importName == "string" && !startsWithUpper(importName)) {
								context.report(node, `Probably you want to import ${importName} as component: "import ${upperFirstLetter(importName)} from '${importPath}';"`);
							}
							if (importPath.endsWith("svg?url") && importName && typeof importName == "string" && startsWithUpper(importName)) {
								context.report(node, `Probably you want to import ${importName} as url: "import ${lowerFirstLetter(importName)} from '${importPath}';"`);
							}
						}
					}
				};
			},
		},
	},
};
