export interface DefaultResponseInterface {
	message: string;
	statusCode: number;
	data: any;
	total?: number;
	page?: number;
}