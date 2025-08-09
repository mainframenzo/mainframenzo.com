// This file is responsible for declaring frontend global types. 
// See ./global-this.ts for more details on why there are 2 global type files.
declare global {
  var app_location: string;
  var publish_stage: string;
  var is_test: boolean | undefined;
}

// TODO need to go through here for global/module scope: https://stackoverflow.com/questions/38906359/create-a-global-variable-in-typescript
export {};