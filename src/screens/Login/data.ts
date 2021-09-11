export default interface ILogin {}

export interface ILoginLayout extends ILogin {
  navigateToForgotPass(): void;
  navigateToRegister(): void;
  handleSingleIn(email: string, password: string): void;
}
