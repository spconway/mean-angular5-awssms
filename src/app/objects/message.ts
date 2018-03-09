export class Message {
  phone: string;
  message: string;
  date: string;
  messageStatus?: string;
  error?: string;
  id?: string;

	constructor(
		phone: string,
		message: string,
		date: string,
		messageStatus?: string,
		error?: string,
		id?: string
	) {
	  this.phone = phone;
	  this.message = message;
	  this.date = this.checkDate(date);
	  this.messageStatus = messageStatus;
	  this.error = error;
	  this.id = id;
  }

  checkDate(d: string): string {
	  return d.length > 0 ? d : Date().toString();
  }

	toString(): string {
	  return "phone: " + this.phone + "\nmessage: " + this.message + "\ndate: " + this.date;
  }
}
