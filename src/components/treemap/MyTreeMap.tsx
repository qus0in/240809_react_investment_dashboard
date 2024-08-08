import { ResponsiveContainer, Treemap } from "recharts";

export const MyTreeMap: React.FC<{
  data: { name: string; size: number }[];
  color: string;
}> = ({ data, color }) => {
  return (
    <div style={{ width: "100%", height: "auto", aspectRatio: "4 / 3" }}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="#fff"
          fill={color}
        ></Treemap>
      </ResponsiveContainer>
    </div>
  );
};
