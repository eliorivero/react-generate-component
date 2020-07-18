import { parse, Args } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import {
  yellow,
  magenta,
  green,
  bold,
} from "https://deno.land/std/fmt/colors.ts";

const parsedArgs: Args = parse(Deno.args);
let name: string = "";
let path: string = "";
let fileNameAsInput: boolean = parsedArgs["e"] || parsedArgs["exact"];
let writeUtilFunction: boolean = parsedArgs["u"] || parsedArgs["utility"];

if (!parsedArgs["_"].length) {
  throw "Component name required";
} else {
  name = "" + parsedArgs["_"];
}

if (parsedArgs["p"] && "boolean" === typeof parsedArgs["p"]) {
  throw "Bad Parameter. Perhaps you wanted to use --path?";
}

if (parsedArgs["p"]) {
  path = parsedArgs["p"];
} else if (parsedArgs["path"]) {
  path = parsedArgs["path"];
} else {
  path = writeUtilFunction ? "app/utils" : "app/components";
}

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
const ccName: string = name.split("-").map(
  parsedArgs["u"]
    ? (nameFragment: string, idx: number): string =>
      0 === idx ? nameFragment : capitalize(nameFragment)
    : (nameFragment: string): string => capitalize(nameFragment),
).join("");
const basePath: string = `./${path}/${fileNameAsInput ? name : ccName}`;

if (writeUtilFunction) {
  const utilContent: string = `const ${ccName} = param => {
  return param;
};

export default ${ccName};
`;
  console.info(`Writing function ${bold(ccName)}`);
  ensureDir(`./${path}`)
    .then(async () => {
      await Deno.writeTextFile(basePath + ".js", utilContent);
      console.info(yellow(`${bold(basePath + ".js")}`));

      console.info("Done!");
    });
} else {
  const compoNameLc: string = (fileNameAsInput ? name : ccName).toLowerCase();

  const compoContent: string = `/*
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

${ccName}.propTypes = {

};

function ${ccName}( props ) {
    return (
        <div className="${compoNameLc}">
        </div>
    );
}

export default ${ccName};
`;

  const compoTest: string = `/*
  * External dependencies
  */
import React from 'react';
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import ${ccName} from './index';

describe('${ccName}', () => {
    const wrapper = mount(<${ccName} />);
    it('renders correctly', () => {
        expect( wrapper.find( '.${compoNameLc}' ) ).toHaveLength(1);
    });
});
`;

  const compoStyles: string = `/* Styles for ${ccName} */
`;

  console.info(`Writing component ${bold(ccName)}`);
  ensureDir(basePath)
    .then(async () => {
      await Deno.writeTextFile(basePath + "/index.js", compoContent);
      console.info(yellow(`${bold(basePath + "/index.js")}`));

      await Deno.writeTextFile(basePath + "/style.scss", compoStyles);
      console.info(magenta(`${bold(basePath + "/style.scss")}`));

      await Deno.writeTextFile(basePath + "/test.js", compoTest);
      console.info(green(`${bold(basePath + "/test.js")}`));

      console.info("Done!");
    });
}
