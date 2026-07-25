import React, { useEffect } from "react";
import { Tree, Input } from "@go-git-cms/design-system";
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxFromMarkdown, mdxToMarkdown } from 'mdast-util-mdx'
import { mdxjs } from 'micromark-extension-mdxjs'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'


// A plugin field component receives the field's data as one object
// (PluginFieldProps): the full schema field plus value/onChange/readOnly.
// This one stores its text uppercased.
export default function MDXField({ field, value, onChange, readOnly }) {
  const tree = parseMDX(value)
  
  return (
    <Input value={JSON.stringify(mdxTree)} />
  )
}

function parseMDX(markdown) {
  const tree = fromMarkdown(src, {
    extensions: [mdxjs(), gfm()],
    mdastExtensions: [mdxFromMarkdown(), gfmFromMarkdown()],
  })

  return tree;
}
