const gqlLoader = require('graphql-tag/loader');

const upstreamTransformer = require('metro/src/DeltaBundler/Transformer.js')

const gqlTransform = gqlLoader.bind({
  cacheable: () => null,
});

function transform(src, filename, options) {
  if (typeof src === 'object') {
    // handle RN >= 0.46
    ({ src, filename, options } = src);
  }

  // Do custom transformations
  let result = src;
  if (filename.endsWith('.gql') || filename.endsWith('.graphql')) {
    result = gqlTransform(result);
  }

  const babelCompileResult = upstreamTransformer.transform({
    src: result,
    filename,
    options,
  });

  // Pass the transformed source to the original react native transformer
  return babelCompileResult;
}

module.exports.transform = transform;
