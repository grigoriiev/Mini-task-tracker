export interface Task {
  id?: number;
  name: string;
  performers:Array<string>;
  title: string;
  priority: string;
  deadline:string;
  status: string;
}
