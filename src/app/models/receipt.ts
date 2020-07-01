import {Status} from './status';

export class Receipt {

  id: number;
  orderId: number;
  priceInCents: number;
  status: Status;
  userId: number;
  bankCard: number;
  creationDate: any;
}
