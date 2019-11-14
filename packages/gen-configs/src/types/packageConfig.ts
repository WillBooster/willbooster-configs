export interface PackageConfig {
  root: boolean;
  willBoosterConfigs: boolean;
  containingPackages: boolean;
  containingJavaScript: boolean;
  containingTypeScript: boolean;
  containingJsxOrTsx: boolean;
  depending: {
    tsnode: boolean;
  };
  eslintBase?: string;
}