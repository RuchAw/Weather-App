export const code_http_unauthorised = 401;
export const code_http_need_info = 406;
export const code_http_block_app = 403;
export const code_http_update_warning_app = 426;
export const code_http_ko = 417;
export const code_http_login_redirect = 307;
export const HTTP_500 = 500;

export const REDIRECT_ERROR_CODES = [code_http_login_redirect];
export const ERROR_CODES = [code_http_need_info, code_http_unauthorised];
export const ACCES_CODES = [code_http_update_warning_app, code_http_block_app,code_http_login_redirect, code_http_unauthorised];