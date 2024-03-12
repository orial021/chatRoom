import { getRepository } from 'typeorm';
import { ErrorReport } from '../Entity/ErrorReportEntity';

class ErrorReportingService {
    static reportError = async (error: any): Promise<void> => {
        const errorReportRepository = getRepository(ErrorReport);
        const newErrorReport = new ErrorReport();
        newErrorReport.message = error.message;
        newErrorReport.stack = error.stack;
        await errorReportRepository.save(newErrorReport);
    }
}

export default ErrorReportingService;