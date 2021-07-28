export interface ICandleStick{
    [key: string]: any;
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades:number;
    takerBuyBaseAssetVolume: string;
    takerBuyQuoteAssetVolume: string;
}

export class CandleStick implements ICandleStick{

    public openTime: number;
    public open: string;
    public high: string;
    public low: string;
    public close: string;
    public volume: string;
    public closeTime: number;
    public quoteAssetVolume: string;
    public numberOfTrades:number;
    public takerBuyBaseAssetVolume: string;
    public takerBuyQuoteAssetVolume: string;

    constructor(candleStick:ICandleStick)
    {
        this.openTime = candleStick[0];
        this.open= candleStick[1];
        this.high= candleStick[2];
        this.low= candleStick[3];
        this.close = candleStick[4];
        this.volume= candleStick[5];
        this.closeTime= candleStick[6];
        this.quoteAssetVolume= candleStick[7];
        this.numberOfTrades= candleStick[8];
        this.takerBuyBaseAssetVolume= candleStick[9];
        this.takerBuyQuoteAssetVolume= candleStick[10];
    }
}