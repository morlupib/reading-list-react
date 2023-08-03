interface Props {
	value: number
	className?: string
}

export function Badge({ value, className = 'absolute top-[-8px] right-[-8px] h-6 w-6' }: Props) {
	return (
		<div className={`flex justify-center items-center bg-red-500 rounded-full ${className}`}>
			<p className='text-xs font-bold text-white'>{value}</p>
		</div>
	)
}
