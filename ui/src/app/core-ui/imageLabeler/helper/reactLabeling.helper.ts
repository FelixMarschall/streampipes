/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export class ReactLabelingHelper {

  private static backgroundAlpha = 0.6;

  //mouse position
  private static lastMouseX = 0;
  private static lastMouseY = 0;
  private static lastMouseXTransformed = 0;
  private static lastMouseYTransformed = 0;
  private static isMouseDown = false;

  private static reactHeight = 0;
  private static reactWidth = 0;

  static mouseDown(mousePos, mousePosTransformed) {
    this.lastMouseX = mousePos[0];
    this.lastMouseY = mousePos[1];
    this.lastMouseXTransformed = mousePosTransformed[0];
    this.lastMouseYTransformed = mousePosTransformed[1];
    this.isMouseDown = true;
  }

  static mouseMove(mousePos, mousePosTransformed, context, label, color) {
    let mouseX = mousePos[0];
    let mouseY = mousePos[1];

    if(this.isMouseDown) {
      this.reactWidth = mouseX - this.lastMouseX;
      this.reactHeight = mouseY - this.lastMouseY;

      context.globalAlpha = this.backgroundAlpha;
      this.drawBox(this.lastMouseX, this.lastMouseY, this.reactWidth, this.reactHeight, color, label, context, true);
      context.globalAlpha = 1;
    }
  }

  static mouseUp(mousePos, mousePosTransformed, coco, labelId) {
    this.isMouseDown = false;
    let reactWidth = mousePosTransformed[0] - this.lastMouseXTransformed;
    let reactHeight = mousePosTransformed[1] - this.lastMouseYTransformed;

    coco.addReactAnnotation(this.lastMouseXTransformed, this.lastMouseYTransformed , reactWidth, reactHeight, labelId);
    console.log('Add react Label:', this.lastMouseXTransformed, this.lastMouseYTransformed, reactWidth, reactHeight, labelId)
  }

  static draw(annotation,label, context, color, imageXShift, imageYShift) {
    context.strokeStyle = color;
    context.fillStyle = color;
    let bbox = annotation.bbox;
    this.drawBox(bbox[0] + imageXShift, bbox[1] + imageYShift, bbox[2], bbox[3], color, label, context, false);
  }

  static drawHighlighted(annotation, label, context, color, imageXShift, imageYShift) {
    context.globalAlpha = 0.6;
    let bbox = annotation.bbox;
    this.drawBox(bbox[0] + imageXShift, bbox[1] + imageYShift, bbox[2], bbox[3], color, label, context, true);
    context.globalAlpha = 1;
  }

  private static drawBox(x,y, widht, height, color, label, context, filled) {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    if (filled) {
      context.fillRect(x, y, widht, height);
    } else {
      context.rect(x, y, widht, height);
    }
    context.fillText(label, x, y - 5 );
    context.stroke();
  }

}