interface Timer1 {
    stop(): void,

    format(): string,

    start(): number,

    end(): number,

    diff(): number
}

export default Timer1;