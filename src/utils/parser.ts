import { TextEntity } from "socialvoid";

function is(x: TextEntity, y: TextEntity) {
  return (
    x.offset === y.offset &&
    x.length === y.length &&
    x.type === y.type &&
    x.value === y.value
  );
}

function htmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function _unparse(
  text: string,
  entities: TextEntity[],
  offset: number,
  length: number
) {
  let noffset = offset;
  let ntext = "";

  for (const entity of entities) {
    if (offset >= entity.length + entity.offset) {
      continue;
    }

    ntext += htmlEscape(text.slice(offset, entity.offset));

    const netntities = entities.filter(
      (entity2) =>
        entity.offset + entity.length >= entity2.offset && !is(entity, entity2)
    );

    let atext = "";

    if (netntities) {
      atext = _unparse(text, netntities, entity.offset, entity.length);
    } else {
      atext = htmlEscape(
        text.slice(entity.offset, entity.offset + entity.length)
      );
    }

    switch (entity.type) {
      case "BOLD":
        ntext += `<b>${atext}</b>`;
        break;
      case "ITALIC":
        ntext += `<i>${atext}</i>`;
        break;
      case "CODE":
        ntext += `<code>${atext}</code>`;
        break;
      case "STRIKE":
        ntext += `<s>${atext}</s>`;
        break;
      case "UNDERLINE":
        ntext += `<u>${atext}</u>`;
        break;
      case "URL":
        ntext += `<a href="${htmlEscape(entity.value!)}">${atext}</a>`;
        break;
      case "MENTION":
        ntext += `<a href="sv://peer/${encodeURIComponent(
          entity.value!
        )}">${atext}</a>`;
        break;
      case "HASHTAG":
        ntext += atext;
    }

    offset = entity.offset + entity.length;
  }

  return ntext + htmlEscape(text.slice(offset, length + noffset));
}

export function unparse(text: string, entities: TextEntity[]) {
  entities = entities.sort((a) => a.offset - a.length);

  return _unparse(text, entities, 0, text.length).replace(/\n/g, "<br />");
}
