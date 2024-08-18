import { Injectable } from '@nestjs/common';
import { FindallCategoryService } from './findall-category.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class ReportCategoryService {
  constructor(private findAllCategory: FindallCategoryService) {}

  async createPdfReport(): Promise<PDFKit.PDFDocument> {
    const categories: CategoryDto[] = await this.findAllCategory.getAllCategories();
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        boldItalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    const printer = new PdfPrinter(fonts);
    const docDefinition = {
      pageSize: 'LETTER',
      header: {
        text: 'Categories Report',
        alignment: 'right',
        margin: [10, 10],
      },
      content: [
        {
          margin: [0, 20],
          layout: 'lightHorizontalLines',
          table: {
            widths: [50, 'auto', 'auto'],
            headerRows: 1,
            body: [[{ text: 'ID', alignment: 'center' }, 'Name', 'Description'], ...categories.map(category => [{ text: category.id, alignment: 'center' }, category.name, category.description])],
          },
        },
      ],
    } as TDocumentDefinitions;

    const options = {};

    return printer.createPdfKitDocument(docDefinition, options);
  }
}
