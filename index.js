module.exports = {
	rules: {
		'svg-import-helper': {
			create: function (context) {
				return {
					ImportDeclaration(node) {
						const importPath = node.source.value;
						const importName = node.specifiers[0].local.name;
						const isDefaultImport =
							node.specifiers[0].type == 'ImportDefaultSpecifier';
						const isSvg = importPath.includes('.svg');
						const startsWithUpper = (str) => {
							return str[0].toUpperCase() === str[0];
						};
						const upperFirstLetter = (str) => {
							return str[0].toUpperCase() + str.slice(1);
						};
						const lowerFirstLetter = (str) => {
							return str[0].toLowerCase() + str.slice(1);
						};
						if (isSvg && isDefaultImport) {
							if (
								importPath.endsWith('svg') &&
								importName &&
								typeof importName == 'string' &&
								!startsWithUpper(importName)
							) {
								context.report(
									node,
									`Probably you want to import ${importName} as component: \n "import ${upperFirstLetter(
										importName
									)} from '${importPath}';"`
								);
							}
							if (
								importPath.endsWith('svg?url') &&
								importName &&
								typeof importName == 'string' &&
								startsWithUpper(importName)
							) {
								context.report(
									node,
									`Probably you want to import ${importName} as url: \n "import ${lowerFirstLetter(
										importName
									)} from '${importPath}';"`
								);
							}
						}
					},
				};
			},
		},
	},
};
