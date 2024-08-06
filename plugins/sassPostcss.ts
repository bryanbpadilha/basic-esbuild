import { sassPlugin } from "esbuild-sass-plugin";
import postcss, { AcceptedPlugin } from "postcss";
import { globSync } from "glob";

interface Props {
  postcssPlugins?: AcceptedPlugin[];
  watchPatterns?: string[];
}

/**
 * https://www.tzeyiing.com/posts/getting-esbuild-to-watch-for-tailwindcss-content-files-for-esbuild-sass-plugin/
 * https://mikefallows.com/posts/using-postcss-and-autoprefixer-with-esbuild/
 */
export default function (props?: Props) {
  return sassPlugin({
    async transform(source, resolveDir, filePath) {
      const { css } = await postcss(props?.postcssPlugins).process(
        source,
        /**
         * The following is just to silence this warning:
         * ```
         * Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.
         * ```
         */
        { from: undefined }
      );

      // specify the loader, otherwise plugin tries to resolve the files as js
      // https://github.com/glromeo/esbuild-sass-plugin/blob/main/src/plugin.ts#L86
      const result: Record<string, any> = {
        loader: "css",
        contents: css,
      }

      if (props?.watchPatterns) {
        result.watchFiles = props.watchPatterns.map((pattern) => {
          return globSync(pattern, { ignore: "node_modules/**" });
        })
      }

      return result;
    },
  });
}
