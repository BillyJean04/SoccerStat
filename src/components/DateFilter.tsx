import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Calendar as CalendarUi } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils.ts";

interface DateFilterProps {
    dateFrom?: Date;
    dateTo?: Date;
    setDateFrom: Dispatch<SetStateAction<Date | undefined>>;
    setDateTo: Dispatch<SetStateAction<Date | undefined>>;
}

const DateFilter: FC<DateFilterProps> = ({ dateFrom, dateTo, setDateFrom, setDateTo }) => {
    return (
        <div className="flex items-center gap-2">
            <span>с</span>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !dateFrom && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "dd.MM.yyyy") : <span>Выберите дату</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <CalendarUi mode="single" selected={dateFrom} onSelect={setDateFrom} />
                </PopoverContent>
            </Popover>
            <span>по</span>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !dateTo && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "dd.MM.yyyy") : <span>Выберите дату</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <CalendarUi mode="single" selected={dateTo} onSelect={setDateTo} />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DateFilter;
