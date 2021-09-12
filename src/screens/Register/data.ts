export default interface IRegister {}
export interface IRegisterLayout extends IRegister {
  handleGoBack(): void;
  checkRegisterIsValid(
    name: string,
    lastName: string,
    email: string,
    password: string,
    checkPassword: string
  ): void;
}
