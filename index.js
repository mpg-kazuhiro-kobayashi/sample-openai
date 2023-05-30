const { Configuration, OpenAIApi } = require('openai');

const API_KEY = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 1.1,
    messages: [
      {
        role: "system",
        content: `あなたはチャットボットです。以下の QA リストを参考に回答をしてください。
Q「」の「」の内部が質問で、A「」の「」の内部が回答になっています。
回答が明確ではない場合は、「https://example.com に飛んでください」とメッセージを返却してください。
回答の文字数は 400 文字以内でお願いします。

kakari はかかりつけ薬局化支援サービスで、患者さんにはモバイルアプリが提供され、薬剤師に対しては SaaS の管理画面が提供されています。
kakari の詳細は https://kakari.medpeer.jp/ を参考にしてください。`,
      },
      {
        role: "system",
        content: `
Q「kakari アプリから使っている薬局の薬局コードをアプリ内部で検索したいです」
A「kakari のアプリでは薬局コード検索機能を提供していません」`,
      },
      {
        role: "system",
        content: `
Q「kakari に登録されている薬局の Google Map のピンの位置がズレています。」
A「お問い合わせください。」`,
      },
      {
        role: "user",
        content: "メドピアの会社について教えてください。"
      }
    ]
  });
  console.log(completion.data);
  console.log(completion.data.choices[0].message);
})()
