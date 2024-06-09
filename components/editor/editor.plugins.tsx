/**
 * This file contains the plugins for the markdown editor
 * @packageDocumentation https://mdxeditor.dev/editor/docs/customizing-toolbar
 */
// import { uploadApi } from '@/api/upload';
// import { store } from '@/store/store';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  // imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';

/**
 * Default code block language
 */
const defaultCodeBlockLanguage = 'typescript';

/**
 * Supported code block languages
 */
const codeBlockLanguages = [
  '', // empty string as default code
  'javascript',
  'js',
  'typescript',
  'ts',
  'jsx',
  'tsx',
  'html',
  'css',
  'scss',
  'json',
  'yaml',
  'shell',
  'markdown',
];

/**
 * Handle image upload
 * TODO: Test this feature
 * @param file
 */
// const handleImageUpload = async (file: File) => {
//   const formData = new FormData();
//
//   formData.append('file', file);
//
//   return await store
//     .dispatch(uploadApi.endpoints.upload.initiate(formData))
//     .unwrap()
//     .then((res) => res.location);
// };

/**
 * Get markdown editor plugins depending on the mode
 * @param mode
 * @param initialValue
 */
export const getMarkdownEditorPlugins = (mode: 'default' | 'view' = 'default', initialValue?: string) =>
  [
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
    linkPlugin(),
    linkDialogPlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage }),
    codeMirrorPlugin({
      codeBlockLanguages: codeBlockLanguages.reduce(
        (acc, language) => {
          acc[language] = language;

          return acc;
        },
        {} as Record<string, string>,
      ),
    }),
    markdownShortcutPlugin(),
    diffSourcePlugin({ diffMarkdown: initialValue, viewMode: 'rich-text' }),
    // imagePlugin({
    //   imageUploadHandler: handleImageUpload,
    // }),
  ].concat(
    mode === 'view'
      ? // No toolbar in view mode
        []
      : // Toolbar in default mode
        [
          toolbarPlugin({
            toolbarContents: () =>
              mode === 'default' && (
                <>
                  <DiffSourceToggleWrapper>
                    <BlockTypeSelect />
                    <BoldItalicUnderlineToggles />
                    <CodeToggle />
                    <InsertCodeBlock />
                    <CreateLink />
                    <ListsToggle />
                    <InsertImage />
                    <InsertTable />
                    <InsertThematicBreak />
                    <UndoRedo />
                  </DiffSourceToggleWrapper>
                </>
              ),
          }),
        ],
  );
