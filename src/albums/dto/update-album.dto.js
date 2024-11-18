"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UpdateAlbumDto = void 0;
var create_album_dto_1 = require("./create-album.dto");
var mapped_types_1 = require("@nestjs/mapped-types");
var UpdateAlbumDto = /** @class */ (function (_super) {
    __extends(UpdateAlbumDto, _super);
    function UpdateAlbumDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateAlbumDto;
}((0, mapped_types_1.PartialType)(create_album_dto_1.CreateAlbumDto)));
exports.UpdateAlbumDto = UpdateAlbumDto;
