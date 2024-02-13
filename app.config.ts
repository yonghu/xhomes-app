import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return { 
    ...config,
    "name": "xhomes",
    "slug": "X Homes",
  };
};
