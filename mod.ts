import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import {
  yellow,
  magenta,
  green,
  bold,
} from "https://deno.land/std/fmt/colors.ts";
declare var Deno: any;

const { args: [name] } = Deno;
const compoName: string = name.split("-").map(
  (nameFragment: string): string =>
    nameFragment.charAt(0).toUpperCase() + nameFragment.slice(1),
  [],
).join("");
const compoNameLc: string = compoName.toLowerCase();
const compoPath: string = "./app/components/" + compoName + "/";

const compoContent: string = `/*
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

${compoName}.propTypes = {
    
};

function ${compoName}(props) {
    return (
        <div className="${compoNameLc}">
        </div>
    );
}

export default ${compoName};

`;

const compoTest: string = `/*
 * External dependencies
 */
import React from 'react';
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import ${compoName} from './index';

describe('${compoName}', () => {
    const wrapper = mount(<${compoName} />);
    it('renders correctly', () => {
        expect( wrapper.find( '.${compoNameLc}' ) ).toHaveLength(1);
    });
});

`;

const compoStyles: string = `/* Styles for ${compoName} */
`;

console.info(`Writing component ${bold(compoName)}`);
ensureDir(compoPath)
  .then(async () => {
    await Deno.writeTextFile(compoPath + "index.js", compoContent);
    console.info(yellow(`${bold(compoPath + "index.js")}`));

    await Deno.writeTextFile(compoPath + "style.scss", compoStyles);
    console.info(magenta(`${bold(compoPath + "style.scss")}`));

    await Deno.writeTextFile(compoPath + "test.js", compoTest);
    console.info(green(`${bold(compoPath + "test.js")}`));

    console.info("Done!");
  });
