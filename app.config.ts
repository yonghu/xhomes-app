import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return { 
    ...config,
    "name": "xhomes",
    "slug": "xhomes",
    "extra": {
      "clerkPublishableKey": process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      "eas": {
        "projectId": "edea82f7-440b-4ec2-99ee-8bd2f61cbde0"
      }
    },
  };
};
