type TStatus = "new" | "in-progress" | "completed";
export default interface IItem {
  id: string;
  title: string;
  status: TStatus;
}
