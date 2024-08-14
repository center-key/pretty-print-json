// @ts-check

import eslint   from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
   eslint.configs.recommended,
   ...tseslint.configs.strictTypeChecked,
   { ignores: ['**/*.js'] },
   {
      languageOptions: { parserOptions: { projectService: true } },
      rules: {
         '@typescript-eslint/no-confusing-void-expression':           'off',  //prefer minimal arrow functions
         '@typescript-eslint/no-floating-promises':                   'off',  //annimations may be fire-and-forget
         '@typescript-eslint/no-misused-promises':                    'off',  //annimations may be fire-and-forget
         '@typescript-eslint/no-non-null-assertion':                  'off',  //ts cannot always know value exists
         '@typescript-eslint/restrict-template-expressions':          'off',  //numbers in templates are natural
         '@typescript-eslint/unbound-method':                         'off',  //safer to not use 'this'
         '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',  //clarity over theoretical exceptions
         },
      },
   ];
