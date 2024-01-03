import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HomeCardProps {
  title: string;
  description: string;
  icon: any;
  amount: number;
}

export const HomeCard = ({
  title,
  description,
  amount,
  icon: Icon,
}: HomeCardProps) => {
  return (
    <Card className="cursor-pointer px-6 py-4 ">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-[16px] flex items-center justify-between">
          <span>{title}</span>
          <Icon size={15} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
          <span className="mb-1 leading-none">{amount}</span>
        </div>
        <p className="transition-colors duration-300 text-[11px]  dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
