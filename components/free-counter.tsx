interface freeCounterProps {
    apiLimitCount: number,

}

export const FreeCounter = ({
    apiLimitCount = 0
}: freeCounterProps) => {
    return (
        <div>
            Free Counter
        </div>
    )
}