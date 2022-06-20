export class TokenResponse {
    public  tokenType: string;
    public  accessToken: string;
    

    public getTokenType(): string {
        return this.tokenType;
    }
    public getAccessToken(): string {
        return this.accessToken;
    }
}