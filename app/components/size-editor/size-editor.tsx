type Props = {
  hidden: boolean;
};

export function SizeEditor(props: Props) {
  const { hidden } = props;
  if (hidden) return <></>;
  return <div>工事中</div>;
}
