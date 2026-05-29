# Lessons Learned

- Avoid adding a workspace package as its own dependency, even in `devDependencies`.
  `multi-semantic-release` uses package manifests to build a release order, so a self
  dependency can create a topological loop and fail release jobs. When a package needs
  to consume its own config during local checks, import the local source file instead
  of the published package name.
