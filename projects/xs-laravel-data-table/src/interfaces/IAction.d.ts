export enum btnType {
    'primary',
    'danger'
}

export interface IAction {
    name: string;
    type: 'primary' | 'secondary' | 'danger' | 'info' | 'success' | any;
    fn: Function;

}
